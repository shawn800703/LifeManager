# Generated by Django 2.1.1 on 2018-10-10 03:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('limit', '0005_auto_20181010_1132'),
        ('on_accountapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='on_account',
            options={},
        ),
        migrations.AddField(
            model_name='on_account',
            name='userid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='limit.User', verbose_name='建立人員'),
        ),
    ]
