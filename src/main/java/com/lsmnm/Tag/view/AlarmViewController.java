package com.lsmnm.Tag.view;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Slf4j
@RequestMapping("/A")
public class AlarmViewController {

    /**
     * 알람 DashBoard (MAIN)
     * GET/VIEW/BDP0000
     */
    @GetMapping("/BDP0000")
    public String BDP0000Page(Model model) {
        return "BDP/BDP0000";
    }

    /**
     * 알람 관리 (MAIN)
     * GET/VIEW/BDP0040
     */
    @GetMapping("/BDP0040")
    public String bdp0040Page(@RequestParam(required = false) String USER_ID,
                              @RequestParam(required = false) String PGM_ID,
                              Model model) {
        model.addAttribute("userId", USER_ID);
        model.addAttribute("pgmId", PGM_ID);
        return "BDP/BDP0040";
    }

    @PostMapping("/BDP0040")
    public String bdp0040Post(HttpServletRequest request, Model model) {

        String userId = request.getParameter("USER_ID");
        String pgmId  = request.getParameter("PGM_ID");

        log.info("userId = " + userId + ", pgmId = " + pgmId);

        model.addAttribute("userId", userId);
        model.addAttribute("pgmId", pgmId);

        return "BDP/BDP0040";
    }

    /**
     * 알람 로그 (MAIN)
     * GET/VIEW/BDP0060
     */
    @GetMapping("/BDP0060")
    public String bdp0060Page(Model model) {
        return "BDP/BDP0060";
    }

    /**
     * 알람 수신자 등록 (SUB)
     * GET/VIEW/SCOA0050
     */
    @GetMapping("/SCOA0050")
    public String SCOA0050Page(Model model) {
        return "BDP/SCOA0050";
    }
}
