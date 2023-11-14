package com.bookishlist.backend.book.repositories;

import com.bookishlist.backend.book.entities.BookListItem;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookListItemRepository extends JpaRepository<BookListItem, UUID> {
    List<BookListItem> findAllByUserId(String userId);
}
