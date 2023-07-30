# signals.py
from django.contrib.auth.models import User
from django.db.models.signals import Signal
from django.dispatch import receiver
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.dispatch import receiver
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.conf import settings

password_reset_signal = Signal()

@receiver(password_reset_signal)
def send_password_reset_email(sender, email, **kwargs):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return
    
    # Generate a token for password reset
    token = default_token_generator.make_token(user)
    
    # Build the reset link with the token
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    domain = "localhost:8000" #get_current_site(None).domain
    reset_link = f"http://{domain}/reset-password/{uid}/{token}/"
    
    # Send the reset link to the user's email
    subject = 'Password Reset Request'
    message = render_to_string('password_reset_email.html', {
        'user': user,
        'reset_link': reset_link
    })
    email = EmailMessage(subject, message, to=[email])
    email.content_subtype = 'html'
    email.send()


@receiver(post_save, sender=User)
def send_registration_email(sender, instance, created, **kwargs):
    if created:
        subject = 'Welcome to our website!'
        message = f'Hi {instance.username},\n\nThank you for registering on our website. We hope you enjoy your experience.\n\nBest regards,\nThe Website Team'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]

        send_mail(subject, message, from_email, recipient_list)
