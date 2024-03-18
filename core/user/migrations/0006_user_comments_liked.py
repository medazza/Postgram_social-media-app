# Generated by Django 4.0 on 2024-03-09 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_comment', '0001_initial'),
        ('core_user', '0005_user_is_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='comments_liked',
            field=models.ManyToManyField(related_name='commented_by', to='core_comment.Comment'),
        ),
    ]
