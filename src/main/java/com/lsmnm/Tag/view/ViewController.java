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

    @GetMapping("/BDP7070")
    public String index(Model model) {

        model.addAttribute("pageTitle", "BDP7070-TagEventAlarmStandard");
        model.addAttribute("currentTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return "TagEventAlarmStandard";
    }


}
