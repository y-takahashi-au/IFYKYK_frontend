package com.example.demo.entity;

import java.time.Instant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Table(name = "user")
@Entity
@Getter
@Setter
public class AccountInfo {

    @Id
    @Column(name = "account_id", length = 26, nullable = false)
    private String accountId;

    @Column(name = "roll", length = 15, nullable = false)
    private String roll;

    @Column(name = "given_name", length = 50, nullable = false)
    private String givenName;

    @Column(name = "family_name", length = 50, nullable = false)
    private String familyName;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "refresh_token", length = 100, nullable = false)
    private String refreshToken;

    @Column(name = "refresh_token_issue_at", nullable = false)
    private Instant refreshTokenIssueAt;
}
