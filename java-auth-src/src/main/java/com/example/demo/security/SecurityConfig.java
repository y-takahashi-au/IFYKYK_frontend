package com.example.demo.security;


import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import com.example.demo.service.LoginUserDetailsService;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(
                                List.of("http://127.0.0.1:5173", "https://localhost:5173"));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT"));
                configuration.setExposedHeaders(List.of("*", "Authorization"));
                configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control",
                                "Content-Type", "Access-Control-Allow-Headers", "X-AUTH-TOKEN"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                System.out.println("------------------" + "authorize" + "------------------");
                http.cors(c -> c.configurationSource(corsConfigurationSource())).exceptionHandling(
                                customizer -> customizer.authenticationEntryPoint(
                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                                .csrf(AbstractHttpConfigurer::disable)
                                // .sessionManagement(customizer ->
                                // customizer.sessionCreationPolicy(
                                // SessionCreationPolicy.STATELESS))
                                // .formLogin(login -> login // フォーム認証を使う
                                // .permitAll()) // フォーム認証画面は認証不要
                                .authorizeHttpRequests(authz -> authz
                                                .requestMatchers("account/login").permitAll() // トップページは認証不要
                                                .anyRequest().authenticated() // 他のURLはログイン後アクセス可能
                                );
                // .authorizeHttpRequests((requests) -> requests.anyRequest().permitAll());
                return http.build();
        }

        // @Bean
        // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // http.authorizeHttpRequests(authorize ->
        // authorize.requestMatchers("/account/**").permitAll()
        // .anyRequest().authenticated())
        // .formLogin(formLogin -> formLogin.loginPage("/login").permitAll())
        // .rememberMe(Customizer.withDefaults());

        // return http.getOrBuild();
        // }

        @Bean
        public DaoAuthenticationProvider authenticationProvider(
                        LoginUserDetailsService loginUserDetailsService) {
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setUserDetailsService(loginUserDetailsService);
                provider.setPasswordEncoder(passwordEncoder());
                return provider;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
