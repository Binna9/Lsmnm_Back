package com.lsmnm.Tag.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/view")
public class ViewController {

    /**
     * Tag Master 관리 기준
     * GET/VIEW/BDP7010
     */
    @GetMapping("/BDP7010")
    public String bdp7010Page(Model model) {
        return "BDP/BDP7010";
    }

    /**
     * Tag Event / Alarm 관리 기준
     * GET/VIEW/BDP7070
     */
    @GetMapping("/BDP7070")
    public String bdp7070Page(Model model) {
        return "BDP/BDP7070";
    }

    /**
     * Tag Chart/Data 조회
     * GET/VIEW/BDP6012
     */
    @GetMapping("/BDP6012")
    public String bdp6012Page(Model model) {
        return "BDP/BDP6012";
    }

    /**
     * 알람 관리
     * GET/VIEW/BDP0040
     */
    @GetMapping("/BDP0040")
    public String bdp0040Page(Model model) {
        return "BDP/BDP0040";
    }

    /**
     * 알람 관리
     * GET/VIEW/BDP0050
     */
    @GetMapping("/BDP0050")
    public String bdp0050Page(Model model) {
        return "BDP/BDP0050";
    }

    /**
     * 알람 로그
     * GET/VIEW/BDP0040
     */
    @GetMapping("/BDP0060")
    public String bdp0060Page(Model model) {
        return "BDP/BDP0060";
    }
}
