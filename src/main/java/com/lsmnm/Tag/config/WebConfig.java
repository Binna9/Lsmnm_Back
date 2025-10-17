package com.lsmnm.Tag.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * CORS 설정 - 외부 도메인의 리소스를 사용하기 위함
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://mesdev.lsmnm.com","https://mesdev.lsmnm.com","http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    /**
     * 정적 리소스 핸들러 설정
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // /SMZ/로 시작하는 요청을 static/SMZ/로 매핑
        registry.addResourceHandler("/SMZ/**")
                .addResourceLocations("classpath:/static/SMZ/")
                .setCachePeriod(3600);
        
        // 이미지 파일을 외부 서버로 프록시
        registry.addResourceHandler("/tag/master/include/images/**")
                .addResourceLocations("https://mesdev.lsmnm.com/SCO/include/images/")
                .setCachePeriod(3600);
    }
}

