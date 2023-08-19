class CaixaDaLanchonete {
    cardapio = {
        itens: [
            {
                codigo: 'cafe',
                descricao: 'Café',
                quantidade: 1,
                valor: 3.00,
            },
            {
                codigo: 'chantily',
                descricao: 'Chantily (extra do Café)',
                quantidade: 1,
                valor: 1.50,
            },
            {
                codigo: 'suco',
                descricao: 'Suco Natural',
                quantidade: 1,
                valor: 6.20,
            },
            {
                codigo: 'sanduiche',
                descricao: 'Sanduíche',
                quantidade: 1,
                valor: 6.50,
            },
            {
                codigo: 'queijo',
                descricao: 'Queijo (extra do Sanduíche)',
                quantidade: 1,
                valor: 2.00,
            },
            {
                codigo: 'salgado',
                descricao: 'Salgado',
                quantidade: 1,
                valor: 7.25,
            },
            {
                codigo: 'combo1',
                descricao: '1 Suco e 1 Sanduíche',
                quantidade: 1,
                valor: 9.50,
            },
            {
                codigo: 'combo2',
                descricao: '1 Café e 1 Sanduíche',
                quantidade: 1,
                valor: 7.50,
            },
        ],
    };

    calcularSubtotal(codigoItem, quantidade) {
        const item = this.cardapio.itens.find(item => item.codigo === codigoItem);
        return item.valor * quantidade;
    }

    validarItem(codigoItem) {
        const itemEncontrado = this.cardapio.itens.find(item => item.codigo === codigoItem);
        return itemEncontrado;
    }

    validarCarrinho(itens) {
        let temChantily = false;
        let temQueijo = false;
        let temSanduiche = false;
        let temCafe = false;

        for (const item of itens) {
            const [codigoItem, quantidade] = item.split(',');
            const quantidadeConvertida = parseInt(quantidade);

            if (!this.validarItem(codigoItem)) {
                return 'Item inválido!';
            }
            if (quantidadeConvertida <= 0) {
                return 'Quantidade inválida!';
            }
            if (codigoItem === 'chantily') {
                temChantily = true;
            } else if (codigoItem === 'queijo') {
                temQueijo = true;
            } else if (codigoItem === 'sanduiche') {
                temSanduiche = true;
            } else if (codigoItem === 'cafe') {
                temCafe = true;
            }
        }
        if ((temChantily && !temCafe) || (temQueijo && !temSanduiche)) {
            return 'Item extra não pode ser pedido sem o principal';
        }
        return 'Carrinho válido';
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (metodoDePagamento !== 'dinheiro' && metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito') {
            return 'Forma de pagamento inválida!';
        }
        const validacaoCarrinho = this.validarCarrinho(itens);
        if (validacaoCarrinho !== 'Carrinho válido') {
            return validacaoCarrinho;
        }

        let total = 0;

        for (const item of itens) {
            const [codigoItem, quantidade] = item.split(',');
            const quantidadeConvertida = parseInt(quantidade);

            const subtotal = this.calcularSubtotal(codigoItem, quantidadeConvertida);
            total += subtotal;
        }
        if (total === 0) {
            return 'Não há itens no carrinho de compra!';
        }
        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };