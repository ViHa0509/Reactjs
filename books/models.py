# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime
# from django.contrib.auth.models import User


# Create your models here.
class Publisher(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(default = '2 Bach Dang', max_length=50)
    city = models.CharField(default = 'sutrix', max_length=60)
    state_province = models.CharField(default = 'HCM', max_length=30)
    country = models.CharField(default ='Viet Nam', max_length=50)
    website = models.URLField(default= 'abc.com')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(unique=True,max_length = 70)

    def __str__(self):
        return self.last_name + ' ' + self.first_name

class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author, related_name= 'newbook')
    publisher = models.ForeignKey(Publisher, related_name= 'books' ,on_delete = models.CASCADE)
    publication_date = models.DateField(default=datetime.date.today)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title



