# Generated by Django 4.2.3 on 2023-07-29 01:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('housing', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/%Y%M%D')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('apartment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='housing.apartment')),
                ('land', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='housing.land')),
            ],
        ),
        migrations.RemoveField(
            model_name='landimage',
            name='land',
        ),
        migrations.DeleteModel(
            name='ApartmentImage',
        ),
        migrations.DeleteModel(
            name='LandImage',
        ),
    ]