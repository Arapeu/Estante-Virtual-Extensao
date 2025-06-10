'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_PDF_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_PDF_TYPES = ['application/pdf']
const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  author: z.string().min(1, 'O autor é obrigatório'),
  theme: z.string().min(1, 'O tema é obrigatório'),
  pdf: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_PDF_SIZE, {
      message: `O arquivo PDF não pode ter mais de 5MB.`,
    })
    .refine((file) => ACCEPTED_PDF_TYPES.includes(file.type), {
      message: 'Apenas arquivos .pdf são aceitos.',
    }),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: `A imagem da capa não pode ter mais de 2MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Apenas formatos .jpeg, .jpg, .png e .webp são aceitos.',
    })
    .optional(),
})

export default function UploadBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      theme: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('author', values.author)
    formData.append('theme', values.theme)
    formData.append('pdf', values.pdf)
    if (values.coverImage) {
      formData.append('coverImage', values.coverImage)
    }

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar o livro')
      }

      toast({
        title: 'Sucesso!',
        description: 'Seu livro foi enviado com sucesso.',
      })
      form.reset()
      router.push('/catalogo')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Algo deu errado.',
        description:
          'Houve um problema com sua solicitação. Por favor, tente novamente.',
        action: <ToastAction altText="Try again">Tentar novamente</ToastAction>,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Cadastro de Livros PDF
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título do livro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o autor do livro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Tecnologia, História, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capa do Livro (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        field.onChange(e.target.files ? e.target.files[0] : null)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pdf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arquivo PDF</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        field.onChange(e.target.files ? e.target.files[0] : null)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Cadastrar Livro'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
} 