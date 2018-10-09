# Generated by Django 2.1.1 on 2018-10-05 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Memo',
            fields=[
                ('memoID', models.AutoField(primary_key=True, serialize=False)),
                ('memoTitle', models.CharField(max_length=60)),
                ('memoContent', models.CharField(blank=True, max_length=300, null=True)),
                ('memoState', models.CharField(max_length=1)),
                ('expiredate', models.DateField(null=True)),
                ('createTime', models.DateTimeField(auto_now_add=True)),
                ('lastUpgradeT', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'Memos',
            },
        ),
    ]