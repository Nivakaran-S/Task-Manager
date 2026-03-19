package com.treinetic.taskmanager.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is highly required")
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotBlank(message = "Status is required")
    private String status;
}