package com.lsmnm.Tag.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@RequestMapping("/view")
public class ViewController {

    /**
     * Tag Master Standard 페이지 렌더링
     * GET /view/tag-master
     */
    @GetMapping("/SMZ7010")
    public String tagMasterStandard(Model model, HttpServletRequest request) {

        model.addAttribute("pageTitle", "SMZ7010-TagMasterStandard");
        model.addAttribute("currentTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return "TagMasterStandard";
    }

    /**
     * Work Tag Standard 페이지 렌더링
     * GET /view/work-tag
     */
    @GetMapping("/work-tag")
    public String workTagStandard(Model model) {

        model.addAttribute("pageTitle", "Work Tag Standard");
        model.addAttribute("currentTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return "WorkTagStandard";
    }

    /**
     * GET /tag-master/bdp7070
     * BDP7070.html 페이지를 띄우는 메서드
     */
    @GetMapping("/BDP7070")
    public String bdp7070Page() {
        return "BDP/BDP7070";
    }

    /**
     * GET /tag-master/bdp0040
     * BDP0040.html 페이지를 띄우는 메서드
     */
    @GetMapping("/BDP0040")
    public String bdp0040Page() {
        return "BDP/BDP0040";
    }

    /**
     * GET /tag-master/bdp0040
     * BDP0040.html 페이지를 띄우는 메서드
     */
    @GetMapping("/BDP6012")
    public String bdp6012Page() {
        return "BDP/BDP6012";
    }
}
