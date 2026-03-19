package com.treinetic.taskmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private String status; // TO_DO, IN_PROGRESS, DONE

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    // Optional: Link tasks to specific users if you want multi-user support
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "user_id")
    // private User user;
}