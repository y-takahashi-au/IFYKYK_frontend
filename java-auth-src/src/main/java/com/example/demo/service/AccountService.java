package com.example.demo.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.entity.Account;
import com.example.demo.entity.AccountInfo;
import com.example.demo.enums.AccountRoll;
import com.example.demo.enums.AccountStatus;
import com.example.demo.repository.AccountInfoRepository;
import com.example.demo.repository.AccountRepository;
import com.example.demo.utils.CreateULID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.time.Instant;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    private final AccountInfoRepository accountInfoRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Account createAccount() {
        var account = new Account();
        account.setId(CreateULID.UUID());
        account.setStatus(AccountStatus.CREATED);
        accountRepository.save(account);
        return account;
    }

    @Transactional
    public AccountInfo applyAccount(String userId, String givenName, String familyName,
            String password) {
        updateAccount(userId, AccountStatus.APPLIED);
        var accountInfo = new AccountInfo();
        accountInfo.setAccountId(userId);
        accountInfo.setRoll(AccountRoll.STUDENT);
        accountInfo.setGivenName(givenName);
        accountInfo.setFamilyName(familyName);
        accountInfo.setPassword(passwordEncoder.encode(password));
        accountInfo.setRefreshToken("");
        accountInfo.setRefreshTokenIssueAt(Instant.now());
        accountInfoRepository.save(accountInfo);
        return accountInfo;
    }

    private Account updateAccount(String userId, AccountStatus accountStatus) {
        return accountRepository.findById(userId).map(account -> {
            account.setStatus(accountStatus);
            accountRepository.save(account);
            return account;
        }).orElseThrow(() -> new UsernameNotFoundException("userId not found."));
    }

    private String createToken(String userId) {
        return JWT.create().withClaim("userid", userId).sign(Algorithm.HMAC256("__secret__"));
    }


    public ResponseEntity<String> createHttpHeaders(String userId) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", createToken(userId));
        return new ResponseEntity<String>(httpHeaders, HttpStatus.OK);
    }
}
