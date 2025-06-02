"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Professor {
  id: string;
  nome: string;
  email: string;
  departamento: string;
  instituicao: string;
  status: string;
  createdAt: string;
}

export default function AdminProfessores() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const carregarProfessores = async () => {
    try {
      const response = await fetch("/api/admin/professores");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao carregar professores");
      }

      setProfessores(data.professores);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatus = async (id: string, novoStatus: string) => {
    try {
      const response = await fetch(`/api/admin/professores/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar status");
      }

      // Atualizar a lista de professores
      setProfessores((prev) =>
        prev.map((prof) =>
          prof.id === id ? { ...prof, status: novoStatus } : prof
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    carregarProfessores();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Professores</CardTitle>
          <CardDescription>
            Aprove ou rejeite os cadastros de professores
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Instituição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professores.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell>{professor.nome}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.departamento}</TableCell>
                  <TableCell>{professor.instituicao}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        professor.status === "APROVADO"
                          ? "bg-green-100 text-green-800"
                          : professor.status === "REJEITADO"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {professor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(professor.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {professor.status === "PENDENTE" && (
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => atualizarStatus(professor.id, "APROVADO")}
                          className="bg-green-50 hover:bg-green-100 text-green-700"
                        >
                          Aprovar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => atualizarStatus(professor.id, "REJEITADO")}
                          className="bg-red-50 hover:bg-red-100 text-red-700"
                        >
                          Rejeitar
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 