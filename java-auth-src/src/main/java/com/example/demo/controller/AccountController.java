package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.AccountInfoDto;
import com.example.demo.dto.UserAuthentification;
import com.example.demo.service.AccountService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    private final DaoAuthenticationProvider daoAuthenticationProvider;

    @GetMapping
    public void authorize() {
        System.out.println("------------------" + "authorize" + "------------------");
    }

    @PostMapping("/create")
    public void createAccount() {
        accountService.createAccount();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserAuthentification request) {
        System.out.println("------------------" + "login" + "------------------");
        try {
            // DaoAuthenticationProviderを用いた認証を行う
            daoAuthenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUserId(), request.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return accountService.createHttpHeaders(request.getUserId());
    }

    @PutMapping("/apply")
    public void applyAccount(@RequestBody AccountInfoDto request) {
        accountService.applyAccount(request.getUserId(), request.getGivenName(),
                request.getFamilyName(), request.getPassword());
    }
}
