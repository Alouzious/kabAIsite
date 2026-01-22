from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('indabax', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LearningResource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('resource_type', models.CharField(choices=[('video', 'YouTube Video'), ('doc', 'Google Doc'), ('slide', 'Slides'), ('link', 'Other Link'), ('file', 'File Upload')], default='link', max_length=10)),
                ('url', models.URLField(blank=True, help_text='Link to resource (YouTube, Google Doc, etc.)')),
                ('file', models.FileField(blank=True, null=True, upload_to='indabax/resources/')),
                ('uploaded_by', models.CharField(blank=True, max_length=100)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('is_published', models.BooleanField(default=True)),
            ],
        ),
    ]