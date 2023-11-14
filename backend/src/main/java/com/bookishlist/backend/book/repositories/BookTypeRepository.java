package com.bookishlist.backend.book.repositories;

import com.bookishlist.backend.book.entities.BookType;
import com.bookishlist.backend.book.entities.BookTypeName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookTypeRepository extends JpaRepository<BookType, Integer> {
    Optional<BookType> findByType(BookTypeName type);
}
