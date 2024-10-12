package com.example.demo.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.dto.UserIssueToken;
import com.example.demo.entity.AccountInfo;
import com.example.demo.properties.SecurityProperties;
import com.example.demo.repository.AccountInfoRepository;
import lombok.extern.slf4j.Slf4j;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;

@Service
@Slf4j
public class JwtUserDetailsService_bk implements UserDetailsService {
    private final AccountInfoRepository accountInfoRepository;

    private final PasswordEncoder passwordEncoder;

    private final SecurityProperties securityProperties;

    public JwtUserDetailsService_bk(AccountInfoRepository accountInfoRepository,
            @Lazy PasswordEncoder passwordEncoder, SecurityProperties securityProperties) {
        this.accountInfoRepository = accountInfoRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityProperties = securityProperties;
    }

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String accountId) throws UsernameNotFoundException {
        final AccountInfo accountInfo = findByAccountId(accountId);
        return User.withUsername(accountInfo.getAccountId()).password(accountInfo.getPassword())
                .authorities(Collections.emptyList()).build();
    }

    @Transactional
    public UserIssueToken issueToken(String username) throws UsernameNotFoundException {
        final Instant now = Instant.now();
        final long accessTokenExpTime = securityProperties.getAccess().getExpiration();
        final String accessTokenSecret = securityProperties.getAccess().getKey();
        final String token = JWT.create().withSubject(username).withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(now.plus(accessTokenExpTime, ChronoUnit.SECONDS)))
                .sign(Algorithm.HMAC512(accessTokenSecret.getBytes()));

        return UserIssueToken.builder().accessToken(token)
                .refreshToken(generateRefreshToken(username)).build();
    }

    @Transactional(readOnly = true)
    public boolean verifyRefreshToken(String username, String refreshToken)
            throws UsernameNotFoundException {
        final AccountInfo accountInfo = findByAccountId(username);

        if (accountInfo.getRefreshTokenIssueAt() != null && accountInfo.getRefreshTokenIssueAt()
                .plus(securityProperties.getRefresh().getExpiration(), ChronoUnit.SECONDS)
                .isBefore(Instant.now())) {
            log.info("Refresh token of {} is already expired", username);
            return false;
        }

        return StringUtils.isNotEmpty(accountInfo.getRefreshToken())
                && passwordEncoder.matches(refreshToken, accountInfo.getRefreshToken());
    }

    private String generateRefreshToken(String username) throws UsernameNotFoundException {
        final int refreshTokenLength = securityProperties.getRefresh().getLength();
        final AccountInfo accountInfo = findByAccountId(username);
        final String token = RandomStringUtils.random(refreshTokenLength, 0, 0, true, true, null,
                new SecureRandom());
        accountInfo.setRefreshToken(passwordEncoder.encode(token));
        accountInfo.setRefreshTokenIssueAt(Instant.now());
        accountInfoRepository.save(accountInfo);
        return token;
    }

    private AccountInfo findByAccountId(String accountId) throws UsernameNotFoundException {
        return accountInfoRepository.findById(accountId).orElseThrow(
                () -> new UsernameNotFoundException("User not found:[" + accountId + "]"));
    }
}
