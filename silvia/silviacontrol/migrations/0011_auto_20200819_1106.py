# Generated by Django 3.0.6 on 2020-08-19 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('silviacontrol', '0010_responsemodel_low_water'),
    ]

    operations = [
        migrations.AddField(
            model_name='responsemodel',
            name='mode',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='statusmodel',
            name='mode',
            field=models.IntegerField(default=0),
        ),
    ]
