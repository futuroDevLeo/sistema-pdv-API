const knex = require("../connections/knex");

const listingOrders = async (cliente_id) => {
  try {
    let query = knex("pedidos")
      .select(
        "pedidos.id",
        "pedidos.valor_total",
        "pedidos.observacao",
        "pedidos.cliente_id",
        "pedido_produtos.id as pedidoProduto_id",
        "pedido_produtos.quantidade_produto",
        "pedido_produtos.valor_produto",
        "pedido_produtos.pedido_id",
        "pedido_produtos.produto_id"
      )
      .leftJoin("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
      .leftJoin("produtos", "pedido_produtos.produto_id", "produtos.id");

        if (cliente_id) {
            query = query.where('pedidos.cliente_id', cliente_id)
        }

        const result = await query;

        const orders = [];

        result.forEach(row => {
            const orderIndex = orders.findIndex(o => o.pedido.id === row.id);

            if (orderIndex === -1) {
                const order = {
                    id: row.id,
                    valor_total: row.valor_total,
                    observacao: row.observacao,
                    cliente_id: row.cliente_id
                };

                const productOrder = {
                    id: row.pedidoProduto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id
                };

                orders.push({ pedido: order, pedido_produtos: [productOrder] });
            } else {
                const productOrder = {
                    id: row.pedidoProduto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id
                };

                pedidos[orderIndex].pedido_produtos.push(productOrder);
            }
        });

        return orders;
    } catch (error) {
        return new Error("Erro ao listar pedidos");
    }
};

const findProductForEachProductId = async (req, res, next) => {
    try {
        const productsNotFound = [];

        for (const produto of pedido_produto) {
            let produtoAtual = await knex('produtos').where('id', produto.produto_id).first()

            if (!produtoAtual) {
                productsNotFound.push(produtoAtual)
            }
        }

        if (productsNotFound.length > 0) {

        }
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const registeringOrder = async () => {
    try {
        
    } catch (error) {
        return new Error("Erro no cadastro do pedido");
    }
};

module.exports = {
    listingOrders,
    findProductForEachProductId,
    registeringOrder
}
