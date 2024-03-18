from django.contrib import admin

# Register your models here.
from .models import Comment

@admin.register(Comment)
class PostAdmin(admin.ModelAdmin):
    list_display = ['post', 'author', 'body']
    list_filter = ['edited']