from django.db import models

# Create your models here.
class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=200, null=True)
    location = models.ForeignKey(
        "LocationVO",
        related_name="hats",
        on_delete=models.CASCADE,
    )


class LocationVO(models.Model):
    closet_name = models.CharField(max_length=200, null=True)
    section_number = models.PositiveSmallIntegerField(null=True)
    shelf_number = models.PositiveSmallIntegerField(null=True)
    import_href = models.CharField(max_length=200, unique=True)
