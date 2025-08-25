# Generated migration for OTP model changes

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='otp',
            name='otp_type',
            field=models.CharField(choices=[('email_verification', 'Email Verification'), ('password_reset', 'Password Reset')], default='password_reset', max_length=20),
        ),
        migrations.AddField(
            model_name='otp',
            name='is_used',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterModelOptions(
            name='otp',
            options={'ordering': ['-created_at']},
        ),
    ]