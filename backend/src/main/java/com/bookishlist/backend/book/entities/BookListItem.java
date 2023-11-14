package com.bookishlist.backend.book.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "book_list_item", schema = "book")
public class BookListItem {
    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "isbn", nullable = false)
    private Book book;

    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type", nullable = false)
    private BookType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status", nullable = false)
    private BookStatus status;

    private Float rating;

    private String comment;

    private LocalDateTime addedAt;

    private LocalDateTime startedReadingAt;

    private LocalDateTime finishedReadingAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public BookType getType() {
        return type;
    }

    public void setType(BookType type) {
        this.type = type;
    }

    public BookStatus getStatus() {
        return status;
    }

    public void setStatus(BookStatus status) {
        this.status = status;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }

    public LocalDateTime getStartedReadingAt() {
        return startedReadingAt;
    }

    public void setStartedReadingAt(LocalDateTime startedReadingAt) {
        this.startedReadingAt = startedReadingAt;
    }

    public LocalDateTime getFinishedReadingAt() {
        return finishedReadingAt;
    }

    public void setFinishedReadingAt(LocalDateTime finishedReadingAt) {
        this.finishedReadingAt = finishedReadingAt;
    }
}
