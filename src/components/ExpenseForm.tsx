import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Expense } from "@/types/expense";
import { CalendarIcon, Save, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ExpenseFormProps {
  expense?: Expense;
  onSave: (expense: Partial<Expense>) => void;
  onCancel: () => void;
}

export const ExpenseForm = ({ expense, onSave, onCancel }: ExpenseFormProps) => {
  const [formData, setFormData] = useState({
    empresa: expense?.empresa || "",
    descricao: expense?.descricao || "",
    nfs_e_numero: expense?.nfs_e_numero || "",
    valor_total: expense?.valor_total || 0,
    data_emitida: expense?.data_emitida || new Date(),
    prazo: expense?.prazo || "À vista",
    mes_referencia: expense?.mes_referencia || new Date().getMonth() + 1,
    ano_referencia: expense?.ano_referencia || new Date().getFullYear(),
  });

  const [parcelas, setParcelas] = useState([
    {
      valor: expense?.valor_parcela_1 || 0,
      data: expense?.data_pagamento_1 || new Date(),
    }
  ]);

  const prazoOptions = [
    "À vista",
    "30 DDL",
    "60 DDL", 
    "90 DDL",
    "Personalizado"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expenseData: Partial<Expense> = {
      ...formData,
      valor_parcela_1: parcelas[0]?.valor,
      data_pagamento_1: parcelas[0]?.data,
      valor_parcela_2: parcelas[1]?.valor,
      data_pagamento_2: parcelas[1]?.data,
      valor_parcela_3: parcelas[2]?.valor,
      data_pagamento_3: parcelas[2]?.data,
      valor_parcela_4: parcelas[3]?.valor,
      data_pagamento_4: parcelas[3]?.data,
    };

    onSave(expenseData);
  };

  const addParcela = () => {
    if (parcelas.length < 4) {
      setParcelas([...parcelas, { valor: 0, data: new Date() }]);
    }
  };

  const removeParcela = (index: number) => {
    setParcelas(parcelas.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {expense ? "Editar Gasto" : "Novo Gasto de Manutenção"}
          </h1>
          <p className="text-muted-foreground">
            Preencha os dados do gasto de manutenção
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações Gerais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="empresa">Empresa *</Label>
                <Input
                  id="empresa"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  placeholder="Nome da empresa fornecedora"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="nfs_e_numero">Número NFS-e</Label>
                <Input
                  id="nfs_e_numero"
                  value={formData.nfs_e_numero}
                  onChange={(e) => setFormData({ ...formData, nfs_e_numero: e.target.value })}
                  placeholder="Número da nota fiscal"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="descricao">Descrição *</Label>
              <Input
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descrição do serviço/produto"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="valor_total">Valor Total *</Label>
                <Input
                  id="valor_total"
                  type="number"
                  step="0.01"
                  value={formData.valor_total}
                  onChange={(e) => setFormData({ ...formData, valor_total: parseFloat(e.target.value) || 0 })}
                  placeholder="0,00"
                  required
                />
              </div>

              <div>
                <Label>Data de Emissão *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.data_emitida && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.data_emitida ? (
                        format(formData.data_emitida, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.data_emitida}
                      onSelect={(date) => setFormData({ ...formData, data_emitida: date || new Date() })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="prazo">Prazo de Pagamento</Label>
                <Select value={formData.prazo} onValueChange={(value) => setFormData({ ...formData, prazo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    {prazoOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Controle de Pagamentos</h2>
              {parcelas.length < 4 && (
                <Button type="button" variant="outline" size="sm" onClick={addParcela}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Parcela
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {parcelas.map((parcela, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
                  <div>
                    <Label>Parcela {index + 1}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={parcela.valor}
                      onChange={(e) => {
                        const newParcelas = [...parcelas];
                        newParcelas[index].valor = parseFloat(e.target.value) || 0;
                        setParcelas(newParcelas);
                      }}
                      placeholder="Valor da parcela"
                    />
                  </div>
                  
                  <div>
                    <Label>Data de Pagamento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(parcela.data, "PPP", { locale: ptBR })}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={parcela.data}
                          onSelect={(date) => {
                            const newParcelas = [...parcelas];
                            newParcelas[index].data = date || new Date();
                            setParcelas(newParcelas);
                          }}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex items-end">
                    {parcelas.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeParcela(index)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-primary-dark">
              <Save className="h-4 w-4 mr-2" />
              Salvar Gasto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};