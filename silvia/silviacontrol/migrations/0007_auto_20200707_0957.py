# Generated by Django 3.0.6 on 2020-07-07 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('silviacontrol', '0006_auto_20200701_1913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='responsemodel',
            name='duty_d',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='responsemodel',
            name='duty_i',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='responsemodel',
            name='duty_p',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='responsemodel',
            name='m',
            field=models.FloatField(default=0, null=True),
        ),
    ]
