package com.lsmnm.Tag.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@RequestMapping("/view")
public class ViewController {

    /**
     * Tag Master Standard 페이지 렌더링
     * GET /view/tag-master
     */
    @GetMapping("/tag-master")
    public String tagMasterStandard(Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        
        // 모델에 데이터 추가
        model.addAttribute("pageTitle", "Tag Master Standard");
        model.addAttribute("currentTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        model.addAttribute("contextPath", "/SMZ");
        model.addAttribute("baseUrl", "https://mes.lsmnm.com");
        model.addAttribute("apiUrl", "/tag/api");
        
        // Spring Session 에서 사용자 정보 가져오기
        String userId = (String) session.getAttribute("GW_USER_ID");
        String userName = (String) session.getAttribute("GW_USER_NM");
        String plantCode = (String) session.getAttribute("GW_PLANT_CD");
        
        // 사용자 정보 모델에 추가
        model.addAttribute("userId", userId != null ? userId : "99991201");
        model.addAttribute("userName", userName != null ? userName : "김성준");
        model.addAttribute("plantCode", plantCode != null ? plantCode : "1000");
        
        return "tagMasterStandard";
    }

    /**
     * Work Tag Standard 페이지 렌더링
     * GET /view/work-tag
     */
    @GetMapping("/work-tag")
    public String workTagStandard(Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        
        // 모델에 데이터 추가
        model.addAttribute("pageTitle", "Work Tag Standard");
        model.addAttribute("currentTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        model.addAttribute("contextPath", "/SMZ");
        model.addAttribute("baseUrl", "https://mes.lsmnm.com");
        model.addAttribute("apiUrl", "/tag/api");
        
        // Spring Session 에서 사용자 정보 가져오기
        String userId = (String) session.getAttribute("GW_USER_ID");
        String userName = (String) session.getAttribute("GW_USER_NM");
        String plantCode = (String) session.getAttribute("GW_PLANT_CD");
        
        // 사용자 정보 모델에 추가
        model.addAttribute("userId", userId != null ? userId : "99991201");
        model.addAttribute("userName", userName != null ? userName : "김성준");
        model.addAttribute("plantCode", plantCode != null ? plantCode : "1000");

        return "workTagStandard";
    }

    @GetMapping("/")
    public String index(Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        
        // 모델에 데이터 추가
        model.addAttribute("pageTitle", "Tag Management System");
        model.addAttribute("currentTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        
        // Spring Session에서 사용자 정보 가져오기
        String userId = (String) session.getAttribute("GW_USER_ID");
        String userName = (String) session.getAttribute("GW_USER_NM");
        
        model.addAttribute("userId", userId != null ? userId : "99991201");
        model.addAttribute("userName", userName != null ? userName : "김성준");
        
        return "index";
    }
}
