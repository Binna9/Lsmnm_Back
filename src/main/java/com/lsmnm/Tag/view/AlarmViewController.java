package com.lsmnm.Tag.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("A")
public class AlarmViewController {

    /**
     * 알람 DashBoard (MAIN) - DONE
     * GET/VIEW/BDP0000
     */
    @GetMapping("/BDP0000")
    public String BDP0000Page(Model model) {
        return "BDP/BDP0000";
    }

    /**
     * 알람 관리 (MAIN) - DONE
     * GET/VIEW/BDP0040
     */
    @GetMapping("/BDP0040")
    public String bdp0040Page(Model model) {
        return "BDP/BDP0040";
    }

    /**
     * 알람 로그 (MAIN) - DONE
     * GET/VIEW/BDP0060
     */
    @GetMapping("/BDP0060")
    public String bdp0060Page(Model model) {
        return "BDP/BDP0060";
    }

    /**
     * 알람 수신자 등록 (SUB)
     * GET/VIEW/SCOA0050 - DONE
     */
    @GetMapping("/SCOA0050")
    public String SCOA0050Page(Model model) {
        return "BDP/SCOA0050";
    }
}
