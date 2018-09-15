# from django.conf import settings

# def debug_log(print_output):
#     """
#     Print output if debug is on
#     Can be single item or list
#     """
#     DEBUG = getattr(settings, "DEBUG", None)
#     if DEBUG:
#         if type(print_output) is list:
#             for line in print_output:
#                 print(line)
#         else:
#             print(print_output)

def debug_log(print_output):
    print(print_output)
