using FluentValidation;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Commands.OrderCommands;

namespace OnionVb02.ValidatorStructor.Validators.Order
{
    public class CreateOrderValidator : AbstractValidator<CreateOrderCommand>
    {
        public CreateOrderValidator()
        {
            RuleFor(x => x.AppUserId)
                .GreaterThan(0).WithMessage("Kullanıcı Id geçerli olmalıdır.");
            RuleFor(x => x.ShippingAddress)
                .NotEmpty().WithMessage("Teslimat adresi boş olamaz.")
                .MaximumLength(500).WithMessage("Teslimat adresi en fazla 500 karakter olabilir.");

            RuleFor(x => x.Items)
            .NotEmpty().WithMessage("Sipariş oluşturmak için en az bir ürün eklemelisiniz.")
            .NotNull().WithMessage("Ürün listesi boş olamaz.");

            // Listenin içindeki HER BİR elemanı kontrol et (Döngü)
            RuleForEach(x => x.Items).ChildRules(item =>
            {
                item.RuleFor(x => x.ProductId)
                    .GreaterThan(0).WithMessage("Geçersiz Ürün Id.");

                // item.RuleFor(x => x.Quantity).GreaterThan(0).WithMessage("Adet 0'dan büyük olmalıdır.");
            });
        }
    }
}
