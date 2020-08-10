# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from books.models import Publisher, Author, Book
# Register your models here.
class BookAdmin(admin.ModelAdmin):
    list_display = ('title',)

admin.site.register(Author)
admin.site.register(Book, BookAdmin)
admin.site.register(Publisher)