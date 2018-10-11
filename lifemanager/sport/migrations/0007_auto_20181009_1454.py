# Generated by Django 2.1.1 on 2018-10-09 06:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sport', '0006_auto_20181008_2241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sportitem',
            name='cuser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='limit.User', verbose_name='建立人員'),
        ),
        migrations.AlterField(
            model_name='sportrecord',
            name='cuser',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='limit.User', verbose_name='建立人員'),
        ),
        migrations.AlterField(
            model_name='weightrecord',
            name='cuser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='limit.User', verbose_name='建立人員'),
        ),
    ]
