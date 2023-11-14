package com.bookishlist.backend.book.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "book_status", schema = "book")
public class BookStatus {
    @Id
    private Integer id;

    @Enumerated(EnumType.STRING)
    private BookStatusName status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BookStatusName getStatusName() {
        return status;
    }

    public void setStatusName(BookStatusName status) {
        this.status = status;
    }
}

