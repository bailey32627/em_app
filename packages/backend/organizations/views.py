from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import stripe

# Create your views here.

from .models import Organization

class OrganizationUpgradeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        name = request.data.get("name")
        user = request.user

        #ensure user is not a system admin already
        if Organization.objects.filter( owner=user).exists():
            return Response(
                {"detail": "You already own an organization." },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create the system
        system = Organization.objects.create(name=name, owner=user)

        # TODO: Store system ID in metadata for post-checkout logic

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price": "price_id_from_stripe_dashboard",
                "quantity": 1,
            }],
            mode="subscription",
            success_url="https://yourapp.com/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="https://yourapp.com/cancel",
            metadata={
                "user_id": user.id,
                "system_id": system.id,
            }
        )

        return Response({ "checkout_url": checkout_session.url })
