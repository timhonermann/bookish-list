package com.bookishlist.backend.book.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "book_type", schema = "book")
public class BookType {
    @Id
    private Integer id;

    @Enumerated(EnumType.STRING)
    private BookTypeName type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BookTypeName getTypeName() {
        return type;
    }

    public void setTypeName(BookTypeName type) {
        this.type = type;
    }
}

