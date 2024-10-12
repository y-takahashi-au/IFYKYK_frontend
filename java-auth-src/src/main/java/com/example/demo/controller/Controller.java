package com.example.demo.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.dto.UserIssueToken;
import com.example.demo.properties.SecurityProperties;
import com.example.demo.service.JwtUserDetailsService_bk;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class Controller {
    private final SecurityProperties securityProperties;

    private final JwtUserDetailsService_bk userDetailsService;

    @PostMapping("/refreshToken")
    public UserIssueToken refreshToken(@RequestBody UserIssueToken token) {
        final DecodedJWT jwt = JWT.decode(token.getAccessToken());

        try {
            JWT.require(Algorithm.HMAC512(securityProperties.getAccess().getKey().getBytes()))
                    .build().verify(jwt);
        } catch (TokenExpiredException e) {
            // allow expired access token for user authentication
        } catch (Exception e) {
            throw e;
        }

        if (userDetailsService.verifyRefreshToken(jwt.getSubject(), token.getRefreshToken())) {
            return userDetailsService.issueToken(jwt.getSubject());
        } else {
            throw new BadCredentialsException("Invalid refresh token!");
        }
    }
}
