# Generated by Django 2.1.1 on 2018-10-04 17:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sport', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sportrecord',
            name='cuser',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='limit.user', verbose_name='建立人員'),
        ),
    ]
