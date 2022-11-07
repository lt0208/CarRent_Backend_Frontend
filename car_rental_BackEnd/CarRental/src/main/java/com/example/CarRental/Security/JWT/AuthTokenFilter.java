package com.example.CarRental.Security.JWT;

import com.example.CarRental.Security.Service.UserDetailsImp;
import com.example.CarRental.Security.Service.UserDetailsServiceImp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserDetailsServiceImp userDetailsService;

    Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
       logger.warn("doFilterInternal 1");
        try {
            logger.warn("doFilterInternal 2");

            //obtain JWT from request, which should have header with key "Authorization"
            String headerAuth = request.getHeader("Authorization");
            logger.warn("doFilterInternal 3");

            if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer")) {
                logger.warn("doFilterInternal 4");

                String jwt = headerAuth.substring(7);

                if (jwt != null && jwtUtils.validateJwtToken(jwt)){
                    String username = jwtUtils.getUsernameFromJwtToken(jwt);
                    logger.warn("AuthTokenFilter  1");
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    logger.warn("AuthTokenFilter  2");

                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    logger.warn("AuthTokenFilter  3");

                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    logger.warn("AuthTokenFilter  4");

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    logger.warn("AuthTokenFilter  5");

                }
            }
        } catch (Exception e){
            logger.error("can't set user authentication "+e.getMessage());
        }
        logger.warn("AuthTokenFilter  6");

        filterChain.doFilter(request,response);
        logger.warn("AuthTokenFilter  7");

    }
}
