# Generated by Django 2.1.1 on 2018-10-04 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sport', '0002_auto_20181005_0144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sportrecord',
            name='sdate',
            field=models.DateTimeField(verbose_name='運動日期'),
        ),
    ]
