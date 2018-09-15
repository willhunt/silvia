from django.apps import AppConfig


class SilviacontrolConfig(AppConfig):
    name = 'silviacontrol'

    def ready(self):
        import silviacontrol.signals
