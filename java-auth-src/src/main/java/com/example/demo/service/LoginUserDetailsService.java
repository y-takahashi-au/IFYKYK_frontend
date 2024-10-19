package com.example.demo.service;

import com.example.demo.repository.AccountInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;
import org.springframework.security.core.userdetails.User;

@Service
@RequiredArgsConstructor
public class LoginUserDetailsService implements UserDetailsService {

    private final AccountInfoRepository accountInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        return accountInfoRepository.findById(userId)
                .map(accountInfo -> User.withUsername(accountInfo.getAccountId())
                        .password(accountInfo.getPassword()).authorities(Collections.emptyList())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("userId not found."));
    }
}
