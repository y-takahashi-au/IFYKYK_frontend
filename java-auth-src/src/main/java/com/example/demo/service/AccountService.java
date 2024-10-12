package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.entity.Account;
import com.example.demo.enums.AccountStatus;
import com.example.demo.repository.AccountRepository;
import com.example.demo.utils.CreateULID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    @Transactional
    public Account createAccount() {
        var account = new Account();
        account.setId(CreateULID.UUID());
        account.setStatus(AccountStatus.CREATED);
        accountRepository.save(account);
        return account;
    }
}
