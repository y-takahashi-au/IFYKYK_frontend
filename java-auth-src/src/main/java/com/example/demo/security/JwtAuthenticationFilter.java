package com.example.demo.security;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.demo.dto.UserAuthentification;
import com.example.demo.dto.UserIssueToken;
import com.example.demo.service.JwtUserDetailsService_bk;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import java.util.Collections;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUserDetailsService_bk userDetailsService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException {
        try {
            final UserAuthentification user =
                    new ObjectMapper().readValue(req.getInputStream(), UserAuthentification.class);

            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.getUserId(), user.getPassword(), Collections.emptyList()));
        } catch (IOException e) {
            throw new BadCredentialsException("Invalid credentials", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res,
            FilterChain chain, Authentication auth) throws IOException {
        final UserIssueToken issueToken = userDetailsService.issueToken(auth.getName());
        final String json = (new ObjectMapper()).writeValueAsString(issueToken);

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.getWriter().write(json);
        res.getWriter().flush();
    }
}
