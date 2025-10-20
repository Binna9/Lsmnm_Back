//package com.lsmnm.Tag.tageventalarm.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/TEA")
//public class TEAController {
//
//    @PostMapping("")
//    public ResponseEntity<Void> createComment(@RequestBody CommentRequestDto commentRequestDto) {
//        TEAService.createComment(commentRequestDto);
//        return ResponseEntity.ok().build();
//    }
//
//    @PutMapping("/{commentId}")
//    public ResponseEntity<Void> updateComment(@PathVariable String commentId, @RequestBody CommentUpdateRequestDto commentUpdateRequestDto) {
//        commentService.updateComment(commentId, commentUpdateRequestDto);
//        return ResponseEntity.ok().build();
//    }
//
//    @DeleteMapping("/{commentId}")
//    @PreAuthorize("hasAuthority('COMMENT_DELETE')")
//    @Operation(description = "댓글 삭제")
//    @MessageKey(value = "success.comment.delete")
//    public ResponseEntity<Void> deleteComment(@PathVariable String commentId) {
//        commentService.deleteComment(commentId);
//        return ResponseEntity.ok().build();
//    }
//}
