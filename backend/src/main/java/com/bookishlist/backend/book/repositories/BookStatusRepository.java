package com.bookishlist.backend.book.repositories;

import com.bookishlist.backend.book.entities.BookStatus;
import com.bookishlist.backend.book.entities.BookStatusName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookStatusRepository extends JpaRepository<BookStatus, Integer> {
    Optional<BookStatus> findByStatus(BookStatusName status);
}
