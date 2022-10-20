from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)
    bin_number = models.PositiveSmallIntegerField()


class Shoe(models.Model):
    """
    The Shoe resource should track its manufacturer,
    its model name, its color, a URL for a picture,
    and the bin in the wardrobe where it exists.
    """
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.CharField(max_length=200)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})
