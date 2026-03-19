package com.treinetic.taskmanager.repository;

import com.treinetic.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Custom query methods can go here if needed later (e.g., findByStatus)
}