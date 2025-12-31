using FluentValidation;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Commands.OrderCommands;

namespace OnionVb02.ValidatorStructor.Validators.Order
{
    public class UpdateOrderValidator : AbstractValidator<UpdateOrderCommand>
    {
        public UpdateOrderValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Sipariş Id geçerli olmalıdır.");
            RuleFor(x => x.AppUserId)
                .GreaterThan(0).WithMessage("Kullanıcı Id geçerli olmalıdır.");
            RuleFor(x => x.ShippingAddress)
                .NotEmpty().WithMessage("Teslimat adresi boş olamaz.")
                .MaximumLength(500).WithMessage("Teslimat adresi en fazla 500 karakter olabilir.");

            When(x => x.Items != null, () =>
            {
                // Eğer liste gönderdiyse, içi boş olamaz (Siparişi tamamen boşaltamaz)
                RuleFor(x => x.Items)
                    .NotEmpty().WithMessage("Ürün listesi boş bırakılamaz. Ürünleri güncellemek istemiyorsanız listeyi göndermeyin.");

                // Liste içindeki ürünlerin geçerliliği
                RuleForEach(x => x.Items).ChildRules(item =>
                {
                    item.RuleFor(x => x.ProductId)
                        .GreaterThan(0).WithMessage("Geçersiz Ürün Id.");
                });
            });
        }
    }
}
