package com.lsmnm.Tag.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("T")
public class TagViewController {

    /**
     * Tag Chart/Data 조회 (MAIN) - DONE
     */
    @GetMapping("/BDP6012")
    public String bdp6012Page(Model model) {
        return "BDP/BDP6012";
    }

    /**
     * Tag Event / Alarm 관리 기준 (MAIN) - DONE
     */
    @GetMapping("/BDP7070")
    public String bdp7070Page(Model model) {
        return "BDP/BDP7070";
    }

    /**
     * Chart 속성 변경 (SUB)
     */
    @GetMapping("/SMZ6212")
    public String SMZ6212Page(Model model) {
        return "BDP/SMZ6212";
    }

    /**
     * 사용자 계산식 추가 (SUB)
     */
    @GetMapping("/SMZ6213")
    public String SMZ6213Page(Model model) {
        return "BDP/SMZ6213";
    }

    /**
     * Chart 메모 (SUB)
     */
    @GetMapping("/SMZ6214")
    public String SMZ6214Page(Model model) {
        return "BDP/SMZ6214";
    }

    /**
     * HTML 색상표 (SUB)
     */
    @GetMapping("/SMZ6215")
    public String SMZ6215Page(Model model) {
        return "BDP/SMZ6215";
    }

    /**
     * 즐겨찾기 관리 (SUB)
     */
    @GetMapping("/SMZ6216")
    public String SMZ6216Page(Model model) {
        return "BDP/SMZ6216";
    }

    /**
     * Tag Master 관리 기준 (SUB) - DONE
     */
    @GetMapping("/SMZ7010")
    public String SMZ7010Page(Model model) {
        return "BDP/SMZ7010";
    }

    /**
     * Virtual Tag 관리 (SUB) - DONE
     */
    @GetMapping("/SMZ7030")
    public String SMZ7030Page(Model model) {
        return "BDP/SMZ7030";
    }
}
